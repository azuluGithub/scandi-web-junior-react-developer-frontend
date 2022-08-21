import { PureComponent } from 'react';

import './Loader.style.scss';

class Loader extends PureComponent {

    renderLoader() {
        return (
            <div className="Loader">
                <div className='Loader-Scale'>
                    <div className='Spinner'></div>
                </div>
            </div>
        );
    }

    render() {
        return this.renderLoader();
    }
}

export default Loader;