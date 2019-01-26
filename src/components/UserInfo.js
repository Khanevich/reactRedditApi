import React from 'react';

class UserInfo extends React.Component {
    render() {
        const {user} = this.props;
        return (
        <div className="card" style={{ width: "20%" }}>
            <img
            className="card-img-top card-img--height"
            src={user.data.thumbnail}
            alt=""
            />
            <h5 className="card-title">{user.data.title}</h5>
            <p class="card-text">'Comments:' {user.data.num_comments}</p>
            <a href={user.data.url} className="card-link">Link</a>
        </div>       
        )
    }
}

export default UserInfo