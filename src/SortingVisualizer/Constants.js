// modifiable constants 
let min_bars = 3;                       // minimum number of bars in the body
let max_bars = 250;                     // maximum number of bars in the body

let standard_color = "#2c32e0";          // standard color for a bar
let compared_color = "darkturquoise";    // color of bars under comparison
let swapped_color = "darkred";           // color of swapped bars
let sorted_color = "purple";             // color of sorted bars
let pivot_color = "green";               // color of bars acting as pivots

let min_animation_speed = 0.25;          // min speed multiplier for animations
let max_animation_speed = 4.0;         // max speed multiplier for animations
// ---------------------------------------------------------------------------

// dont modify objects and functions below
export const CONSTS = {
    MIN_BARS: min_bars,
    MAX_BARS: max_bars,
    INIT_BARS: Math.round((max_bars + min_bars) / 2),

    STANDARD_COLOR: standard_color,
    COMPARED_COLOR: compared_color,
    SWAPPED_COLOR: swapped_color,
    SORTED_COLOR: sorted_color,
    PIVOT_COLOR: pivot_color,

    MIN_ANIMATION_SPEED: 0,
    MAX_ANIMATION_SPEED: 100,
    INIT_ANIMATION_SPEED: 50
};

export function getAnimationSpeedMultiplier(p) {
    let minp = CONSTS.MIN_ANIMATION_SPEED;
    let maxp = CONSTS.MAX_ANIMATION_SPEED;

    let minv = min_animation_speed;
    let maxv = max_animation_speed;

    let log_v = Math.log(minv) + (p - minp) * (Math.log(maxv) - Math.log(minv)) / (maxp - minp);
    return Math.exp(log_v);
}

export function getBaseAnimationSpeed(x) {
    return 376.3307 - (8.541539 / 0.02292797) * (1 - Math.exp(-0.02292797 * x));
}