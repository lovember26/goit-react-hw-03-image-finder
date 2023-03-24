import { Component } from 'react';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';
export class Searchbar extends Component {
  state = {
    value: '',
  };
  onChange = ({ target }) => {
    this.setState({ value: target.value });
  };
  render() {
    return (
      <Header className="searchbar">
        <Form className="form" onSubmit={this.props.onSubmit}>
          <Button type="submit" className="button">
            <Label className="button-label">Search</Label>
          </Button>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
            value={this.state.value}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
