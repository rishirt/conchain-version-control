import React, { Component } from 'react';
import { Card, Grid, Button,Form, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link,Router } from '../../routes';

class ContributeForm extends Component {
  state = {
    address: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.addApprover(this.state.address).send({
        from: accounts[0]
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Add a Participant</label>
          <Input
            value={this.state.address}
            onChange={event => this.setState({ address : event.target.value })}
            placeholder = 'address'
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Add
        </Button>
      </Form>
    );
  }
}

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    const requestsCount = await campaign.methods.getRequestsCount().call();

    return {
      address: props.query.address,
      requestsCount: requestsCount,
      owner: summary[0],
      description: summary[1],
      approversCount: summary[2],
    };
  }

  renderCards() {
    const {
      address,
      owner,
      description,
      approversCount,
      requestsCount
    } = this.props;



    const items = [
      {
        header: address,
        meta: 'Address of File',
        description:
          'This is the address of the file on Ethereum Blockchain',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: owner,
        meta: 'Address of Owner',
        description:
          'This is the address of the person who created the file',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestsCount,
        meta: 'Number of Edits',
        description:
          'An edit is made by the creator and is open to feedback'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who need to approve the document for it to be valid(stakeholders)',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: description,
        meta: '',
        description:
          'File Title'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h2>File Edit Summary</h2>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Edits</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
