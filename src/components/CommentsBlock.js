import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isLogged, getUser } from '../services/loginService';
import commentsService from '../services/commentsService';

class CommentsBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      comment: ''
    };
  }

  componentDidMount() {
    const { slugify } = this.props;
    this.setState({ comments: commentsService.get(slugify) });
  }

  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleSubmit = () => {
    const { comment } = this.state;
    const { slugify } = this.props;
    commentsService.insert(slugify, [comment]);
  };

  trash = comment => {
    const { slugify } = this.props;
    if (comment.author === getUser().username) {
      return (
        <button
          disabled={!isLogged()}
          style={{ border: 0, background: '#fff' }}
          onClick={() => {
            commentsService.delete(slugify, comment);
            document.location.reload();
          }}
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      );
    }
    return <div />;
  };

  renderComment = (comment, key) => (
    <div key={key} className="Comment media text-muted pt-3">
      <FontAwesomeIcon className="mr-2" size="3x" icon="user-circle" />
      <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong className="d-block text-gray-dark">@{comment.author}</strong>
        {comment[0]}
      </p>
      {isLogged() && this.trash(comment)}
    </div>
  );
  render() {
    const { comments, comment } = this.state;
    return (
      <div className="text-left">
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">Comments</h6>
          {comments.map((i, key) => this.renderComment(i, key))}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Comment</label>
            <textarea
              disabled={!isLogged()}
              value={comment}
              onChange={this.handleChange}
              required="required"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Insert your comment here"
            />
          </div>
          <button
            disabled={!isLogged()}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CommentsBlock;
