import React, { Component } from 'react';


class ToggleButton extends Component {


render() {
return(
<div>
        <button 

        onClick={this.props.toggleStyle}>
            Switch Theme
        </button>
</div>

)
}
}

export default ToggleButton;
