/* eslint react/no-multi-comp: 0 */

import React from 'react';

//
// Function life - idealistic functional flow
//

const myData = {
    pageName: 'Great List',
    pageData: [
        {
            id: 1,
            name: 'Item 1',
            count: 99
        },
        {
            id: 2,
            name: 'Item 2',
            count: 123
        }
    ]
};

const ItemFC = ({ name, count }) => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
        <span>{name}</span>
        <span className="badge badge-primary badge-pill">{count}</span>
    </li>
);

/* eslint arrow-parens: 0 */
const ListFC = props => {
    const { listData } = props;
    return (
        <ul className="list-group">
            {listData.map(itemData => (
                <ItemFC key={itemData.id} {...itemData} />
            ))}
        </ul>
    );
};

const PageFC = ({ pageName, pageData }) => (
    <div>
        <h4>{pageName}</h4>
        <ListFC listData={pageData} />
    </div>
);

export const ThreeFunctionalComponents = () => <PageFC {...myData} />;

//
//  Taken and reworked a bit from:
// https://appdividend.com/2017/10/24/reactjs-higher-order-components-tutorial/
//

class TableRow extends React.Component {
    render() {
        const { id, name } = this.props.rowData; //eslint-disable-line
        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
            </tr>
        );
    }
}

class StockList extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    tabRow() {
        const { data } = this.props;
        let retValue = null;
        if (data instanceof Array) {
            retValue = data.map((object/* , i */) => <TableRow rowData={object} key={object.id} />);
        }
        return retValue;
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow()}</tbody>
                </table>
            </div>
        );
    }
}

class UserList extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    tabRow() {
        const { data } = this.props;
        let retValue = null;
        if (data instanceof Array) {
            retValue = data.map((object/* , i */) => <TableRow rowData={object} key={object.id} />);
        }
        return retValue;
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow()}</tbody>
                </table>
            </div>
        );
    }
}

const Hoc = (HocComponent, parentData) => {
    class WrappedComponent extends React.Component {
        // constructor(props) {
        //     super(props);
        // }

        state = {
            data: parentData
        };

        render() {
            const { data } = this.state;
            return <HocComponent data={data} {...this.props} />;
        }
    }

    return WrappedComponent;
};

const stocksData = [
    {
        id: 1,
        name: 'TCS'
    },
    {
        id: 2,
        name: 'Infosys'
    },
    {
        id: 3,
        name: 'Reliance'
    }
];
const usersData = [
    {
        id: 1,
        name: 'Krunal'
    },
    {
        id: 2,
        name: 'Ankit'
    },
    {
        id: 3,
        name: 'Rushabh'
    }
];

const Stocks = Hoc(StockList, stocksData);

const Users = Hoc(UserList, usersData);

export class UsersAndStocks extends React.PureComponent {
    render() {
        return (
            <div>
                <h4>Users:</h4>
                <Users />
                <h4>Stocks:</h4>
                <Stocks />
            </div>
        );
    }
}
