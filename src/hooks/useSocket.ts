import React, { useState, useEffect } from 'react';
// import useSWR from 'swr';
// import { getUserInfo } from '@/services/user';
// import Socket, { getSocket } from '@/core/socket';
// import { socketURL } from '@/config/base';

// function useSocket() {
//   const [socket, setSocket] = useState<Socket>();
//   const { data } = useSWR<any>('getUserInfo', getUserInfo);

//   useEffect(() => {
//     if (data) {
//       const s = getSocket(socketURL, data);
//       setSocket(s);
//     }
//   }, [data]);

//   return { socket };
// }

// export default useSocket;
