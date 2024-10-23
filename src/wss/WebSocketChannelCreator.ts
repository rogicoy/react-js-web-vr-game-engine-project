/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { eventChannel, END, buffers } from 'redux-saga';

const WebSocketChannelCreator = {
  create: (socket: WebSocket) => {
    return eventChannel((emit: any) => {
      const responseHandler = (event: any) => {
        emit(event.data);
      };

      const errorHandler = (eventEvent: any) => {
        emit(eventEvent.data);
      };

      socket.addEventListener('message', responseHandler);
      socket.addEventListener('error', errorHandler);
      socket.addEventListener('close', () => {
        emit(END);
      });

      const unsubscribe = () => {
        console.log('Unsubscribing from socket');
        socket.removeEventListener('message', responseHandler);
        socket.removeEventListener('error', errorHandler);
        socket.close();
      };

      return unsubscribe;
    }, buffers.expanding<any>(10));
  }
};

export default WebSocketChannelCreator;
