/**
 * Keep a click from escaping a dialog into whatever rendered it.
 *
 * Consumers routinely mount a Modal or Drawer inside a clickable row, so a click on any control
 * inside the dialog would otherwise bubble up the React tree and fire that row's handler.
 *
 * This has to sit on an element headlessui does not render. It runs every `on*` prop through
 * `mergeProps`, which bails out with `if (event.defaultPrevented) return`, and its own controls
 * (Switch, Menu.Button, Listbox) call `preventDefault()` on click. So neither `Dialog.Panel`'s
 * built-in handler nor one we pass to a `Transition.Child` child survives; both are skipped for
 * exactly the elements most likely to be inside a dialog.
 *
 * @param {React.MouseEvent} event
 */
export const stopClickPropagation = (event) => {
    event.stopPropagation();
};
