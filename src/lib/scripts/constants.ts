const ATTRIBUTE_PREFIX = 'data-a-';
const TEXT_ATTRIBUTE_PREFIX = 'data-a-text-';

export const STATES = ['initialized', 'waiting', 'running', 'finished'];

export const DEFAULTS = {
	ATTRIBUTES: {
		TYPE: `${ATTRIBUTE_PREFIX}type`,
		STATE: `${ATTRIBUTE_PREFIX}state`,
		TIMING_FUNCTION: `${ATTRIBUTE_PREFIX}timing-function`,
		DELAY: `${ATTRIBUTE_PREFIX}delay`,
		DURATION: `${ATTRIBUTE_PREFIX}duration`,
		OLD_ANIMATION: `${ATTRIBUTE_PREFIX}a-old`,
		OFFSET: `${ATTRIBUTE_PREFIX}offset`,
		THRESHOLD: `${ATTRIBUTE_PREFIX}threshold`,
	},
	VALUES: {
		TYPE: 'slide-in-from-bottom',
		TIMING_FUNCTION: 'ease',
		DELAY: 0,
		DELAY_STEP: 0,
		DURATION: 800,
		OFFSET: '0px',
		THRESHOLD: 0.1,
	},
};
export const TEXT_DEFAULTS = {
	ATTRIBUTES: {
		TYPE: `${TEXT_ATTRIBUTE_PREFIX}type`,
		STATE: `${TEXT_ATTRIBUTE_PREFIX}state`,
		TIMING_FUNCTION: `${TEXT_ATTRIBUTE_PREFIX}timing-function`,
		DELAY: `${TEXT_ATTRIBUTE_PREFIX}delay`,
		SYMBOL_DELAY: `${TEXT_ATTRIBUTE_PREFIX}symbol-delay`,
		DURATION: `${TEXT_ATTRIBUTE_PREFIX}duration`,
		OFFSET: `${TEXT_ATTRIBUTE_PREFIX}offset`,
		THRESHOLD: `${TEXT_ATTRIBUTE_PREFIX}threshold`,
		WORD: `${TEXT_ATTRIBUTE_PREFIX}word`,
		SYMBOL: `${TEXT_ATTRIBUTE_PREFIX}symbol`,
	},
	VALUES: {
		TYPE: 'slide-in-from-bottom',
		TIMING_FUNCTION: 'ease',
		DELAY: 0,
		SYMBOL_DELAY: 10,
		DURATION: 800,
		OFFSET: '0px',
		THRESHOLD: 0.1,
	},
};
