// modifiable constants 
let min_bars = 3;                       // minimum number of bars in the body
let max_bars = 250;                     // maximum number of bars in the body

let standard_color = "#2c32e0";         // standard color for a bar
let compared_color = "lightblue";       // color of bars under comparison
let swapped_color = "darkred";              // color of swapped bars
let sorted_color = "darkorange";            // color of sorted bars
let pivot_color = "green";            // color of bars acting as pivots

let min_animation_speed = 0.1;          // min speed multiplier for animations
let max_animation_speed = 10.0;         // max speed multiplier for animations

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
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

// Computes once, and then returns, the base animation 
// speed given x number of bars
var _baseAnimationSpeed = undefined;
export function getBaseAnimationSpeed(x) {
    if (_baseAnimationSpeed !== undefined) {
        return _baseAnimationSpeed;
    }
    _baseAnimationSpeed = 376.3307 - (8.541539 / 0.02292797) * (1 - Math.exp(-0.02292797 * x));
    return _baseAnimationSpeed;
}

// Computes the animation speed multiplier on the logarithmic
// scale of the speed range input
function getAnimationSpeedMultiplier(p) {
    let minp = CONSTS.MIN_ANIMATION_SPEED;
    let maxp = CONSTS.MAX_ANIMATION_SPEED;

    let minv = min_animation_speed;
    let maxv = max_animation_speed;

    let log_v = Math.log(minv) + (p - minp) * (Math.log(maxv) - Math.log(minv)) / (maxp - minp);
    return Math.exp(log_v);
}

// Computes the spped multiplier and update the base animation
// interval with the found multiplier
var _speedControl = undefined;
export function updateAnimationSpeed(baseInterval) {
    let multiplier = 1;

    if (_speedControl === undefined) {
        _speedControl = document.getElementsByName("speed-control")[0];
    }

    if (_speedControl !== undefined) {
        multiplier = getAnimationSpeedMultiplier(_speedControl.valueAsNumber);
        if (multiplier <= 0) {
            multiplier = 1;
        }
    }

    return baseInterval / multiplier;
}