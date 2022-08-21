class CSS {
    static setVariable(ref, name, value) {
        if (ref && ref.current) {
            ref.current.style.setProperty(`--${name}`, value);
        }
    }
}

export default CSS;
