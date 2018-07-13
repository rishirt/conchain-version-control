import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const itemsCount = await factory.methods.getItemsCount().call();
    const docs = await Promise.all(
      Array(parseInt(itemsCount))
        .fill()
        .map((element, index) => {
          return factory.methods.deployedItems(index).call();
        })
    );
    return { docs };
  }

  renderDocs() {
    const items = this.props.docs.map((request,index) => {
      let owner = request.owner;
      let description = request.description;

      return {
         header: owner,
         description: (
           <div>
            <br></br>
            <h4>This file is managed by the above address</h4>
            <h3>{`${description}`}</h3>
            <Link route={`/campaigns/${request.itemAddress}`}>
              <a>View Edit History</a>
            </Link>
         </div>
        ),
        fluid: true
     }
   })
    return <Card.Group items={items} />;
}

  render() {
    return (
      <Layout>
        <div>
          <h2>Common Data Environment</h2>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create New File"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderDocs()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
