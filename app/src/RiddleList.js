/**
 * Created by Dominik Schwarz on 24.07.2017.
 */
import React, { Component } from "react";
import { Alert, FlatList, Button, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { List, ListItem } from "react-native-elements";

import Utils from "./utils/Utils";

export default class RiddleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 0,
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page } = this.state;
        const url = `http://192.168.178.67:8080/api/riddles?page=${page}&size=20`;
        this.setState({ loading: true });
        fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.props.accessToken}`
            }})
            .then(Utils.checkStatus)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 0 ? res._embedded.riddles : [...this.state.data, ...res._embedded.riddles],
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                console.error(error);
                Alert.alert(
                    'Error',
                    'Oh no! An error occured. Sorry for that!'
                );
            });
    };

    handleRefresh = () => {
        this.setState({
                page: 0,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState({
                page: this.state.page + 1
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator />
            </View>
        );
    };

    render() {
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                          title={item.name}
                          subtitle={`${item.type} ${item.category}`}
                          containerStyle={{ borderBottomWidth: 0 }}
                        />
                     )}
                    keyExtractor={item => item.name}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}
                />
            </List>
        );
    }
}
