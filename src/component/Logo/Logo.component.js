import { PureComponent } from 'react';

import Logo from 'Util/Icons/Logo';

class LogoComponent extends PureComponent {
    
    renderLogo() {
        return <Logo />;
    }

    render() {
        return this.renderLogo();
    }
}

export default LogoComponent;