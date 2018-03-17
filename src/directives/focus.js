/* Inspired by https://github.com/simplesmiler/vue-focus */

function process(el, binding) {
  const alreadyFocused = el === document.activeElement;
  const shouldBeFocused = binding.value;

  if (!alreadyFocused && shouldBeFocused) {
      el.focus();
  }

  if (alreadyFocused && !shouldBeFocused) {
      el.blur();
  }
}

export default {
  inserted(el, binding) {
      process(el, binding);
  },

  componentUpdated(el, binding) {
      if (binding.modifiers.lazy && Boolean(binding.value) === Boolean(binding.oldValue)) {
          return;
      }

      process(el, binding);
  },
};
