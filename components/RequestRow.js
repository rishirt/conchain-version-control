import React, { Component } from 'react';
import { Table, Button,Form,Input,Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
  constructor(){
    super();
    this.state = {
      comment : '',
      errorMessage :'',
      loading : false
    }
  }
  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  onComment = async () => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const campaign = await web3.eth.getAccounts();
      await campaign.methods.addComment(this.state.comment).send({
        from: accounts[0]
      })
    }catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const { Cell,Header, Row, HeaderCell, Body  } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
     <div> 
      <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Version Title</HeaderCell>
              <HeaderCell>Commit Message</HeaderCell>
              <HeaderCell>File Location</HeaderCell>
            </Row>
          </Header>
          <Body>
            <Row
            disabled={request.complete}
            positive={readyToFinalize && !request.complete}
            >
              <Cell>{id}</Cell>
              <Cell>{request.documentTitle}</Cell>
              <Cell>{request.commitMessage}</Cell>
              <Cell>{request.documentLocation}</Cell>
            </Row>
          </Body>
      </Table>
      <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>TimeStamp</HeaderCell>
              <HeaderCell>Hash</HeaderCell>
              <HeaderCell>Approvals</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            <Row
            disabled={request.complete}
            positive={readyToFinalize && !request.complete}
            >
              <Cell>{id}</Cell>
              <Cell>{request.blockTimestamp}</Cell>
              <Cell>{request.fileHash}</Cell>
              <Cell>{request.approvalCount}/{approversCount}</Cell>
              <Cell>{request.complete ? null : (
                <Button color="green" basic onClick={this.onApprove}>
                Approve
                </Button>)}</Cell>
              <Cell>{request.complete ? null : (
                <Button color="teal" basic onClick={this.onFinalize}>
                Finalize
                </Button>)}</Cell>
            </Row>
          </Body>
      </Table>
      <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Address</HeaderCell>
              <HeaderCell>Comment</HeaderCell>
              <HeaderCell></HeaderCell>
            </Row>
          </Header>
          <Body>
            <Row>
              <Cell>{id}</Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
            </Row>
          </Body>
      </Table>

      <h3>Add a Comment</h3>
      <Form disabled = {request.complete} onSubmit={this.onComment} error={!!this.state.errorMessage}>
          <Form.Field>
            <Input
              value={this.state.comment}
              onChange={event =>
                this.setState({ comment: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Comment
          </Button>          
        </Form>
      <hr></hr>
      <br></br>
      <hr></hr>
    </div>
    );
  }
}

export default RequestRow;
