class InputEventClass extends EventTarget {
    MouseWheel(event: any) { this.dispatchEvent(new Event("mouse-wheel", event)) }
}

// Previous Inputs
export const Inputs: { [key: string]: number } = {}

export const InputEvent = new InputEventClass();