export const CUSTOM_PRESETS = Symbol(
  import.meta.env?.MODE === 'development' ? 'motionCustomPresets' : '',
)
