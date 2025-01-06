import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ky from 'ky';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const socket = io("httos://api.frcrekon.com", {
        autoConnect: false
    });

    const connectSocket = () => {
        socket.connect();
    };

    const disconnectSocket = () => {
        socket.disconnect();
    };

    const send = (event, data) => {
        socket.emit(event, data);
    };

    const receive = (event, callback) => {
        socket.on(event, callback);
    };

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ connectSocket, disconnectSocket, send, receive }}>
          {children}
        </SocketContext.Provider>
    );
};
