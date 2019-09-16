export const TOGGLE_BRIGHTNESS = "TOGGLE_BRIGHTNESS";

export function toggleBrightness(indexNote, on) {
    return {
        type: TOGGLE_BRIGHTNESS, indexNote, on
    }
}