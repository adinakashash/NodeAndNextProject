// import React, { useState, useEffect } from 'react';
// import io, { Socket } from 'socket.io-client';
// import { TextField, Button, Box, Typography, Paper, Stack } from '@mui/material';
// import { styled } from '@mui/material/styles';

// interface Message {
//   text: string;
//   timestamp: string;
//   username: string;
  
// }

// const socket: Socket = io('http://localhost:5000'); // Ensure this URL matches your server

// const MessageBubble = styled(Paper)(({ theme, ownMessage }: { ownMessage?: boolean }) => ({
//   display: 'inline-block',
//   maxWidth: '70%',
//   padding: theme.spacing(1.5),
//   margin: theme.spacing(1),
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: ownMessage ? theme.palette.primary.main : theme.palette.secondary.main,
//   color: theme.palette.getContrastText(ownMessage ? theme.palette.primary.main : theme.palette.secondary.main),
// }));

// const Username = styled(Typography)(({ theme, ownMessage }: { ownMessage?: boolean }) => ({
//   fontWeight: 'bold',
//   color: ownMessage ? theme.palette.primary.dark : theme.palette.secondary.dark,
//   marginBottom: theme.spacing(0.5),
// }));

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [messageInput, setMessageInput] = useState<string>('');
//   const [username, setUsername] = useState<string>('');

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (!storedUsername) {
//       const newUsername = prompt('Enter your username:') || 'Anonymous';
//       setUsername(newUsername);
//       localStorage.setItem('username', newUsername);
//     } else {
//       setUsername(storedUsername);
//     }

//     socket.on('message', (message: Message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('message');
//     };
//   }, []);

//   const sendMessage = () => {
//     if (messageInput.trim() !== '') {
//       const message: Message = { text: messageInput, timestamp: new Date().toISOString(), username };
//       socket.emit('message', message);
//       setMessageInput(''); // Clear input after sending
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         background: 'linear-gradient(to bottom, #2196F3, #BBDEFB)',
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: '400px',
//           height: '80vh',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <Box
//           sx={{
//             flex: 1,
//             padding: 2,
//             overflowY: 'auto',
//             display: 'flex',
//             flexDirection: 'column',
//             bgcolor: '#f5f5f5',
//           }}
//         >
//           {messages.map((msg, index) => (
//             <Stack
//               key={index}
//               direction={msg.username === username ? 'row-reverse' : 'row'}
//               spacing={1}
//               sx={{ mb: 1, alignItems: 'flex-start' }}
//             >
//               <Box>
//                 <Username ownMessage={msg.username === username}>
//                   {msg.username}
//                 </Username>
//                 <MessageBubble ownMessage={msg.username === username}>
//                   <Typography variant="body2">{msg.text}</Typography>
//                 </MessageBubble>
//                 <Typography variant="caption" color="text.secondary">
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </Typography>
//               </Box>
//             </Stack>
//           ))}
//         </Box>
//         <Box
//           sx={{
//             display: 'flex',
//             borderTop: '1px solid #ddd',
//             padding: 1,
//             bgcolor: '#fff',
//           }}
//         >
//           <TextField
//             fullWidth
//             variant="outlined"
//             size="small"
//             placeholder="Type your message..."
//             value={messageInput}
//             onChange={(e) => setMessageInput(e.target.value)}
//             sx={{ borderRadius: 0, '& fieldset': { border: 'none' } }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ ml: 1 }}
//             onClick={sendMessage}
//           >
//             Send
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Chat;
import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { TextField, Button, Box, Typography, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Message {
  text: string;
  timestamp: string;
  username: string;
  reportId: string;
}

const socket: Socket = io('http://localhost:3000'); // Ensure this URL matches your server

const MessageBubble = styled(Paper)(({ theme, ownMessage }: { ownMessage?: boolean }) => ({
  display: 'inline-block',
  maxWidth: '70%',
  padding: theme.spacing(1.5),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: ownMessage ? theme.palette.primary.main : theme.palette.secondary.main,
  color: theme.palette.getContrastText(ownMessage ? theme.palette.primary.main : theme.palette.secondary.main),
}));

const Username = styled(Typography)(({ theme, ownMessage }: { ownMessage?: boolean }) => ({
  fontWeight: 'bold',
  color: ownMessage ? theme.palette.primary.dark : theme.palette.secondary.dark,
  marginBottom: theme.spacing(0.5),
}));

const Chat: React.FC<{ reportId: string }> = ({ reportId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      const newUsername = prompt('Enter your username:') || 'Anonymous';
      setUsername(newUsername);
      localStorage.setItem('username', newUsername);
    } else {
      setUsername(storedUsername);
    }

    // Register user with the server
    socket.emit('register', username);

    socket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [username]);

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const message: Message = { text: messageInput, timestamp: new Date().toISOString(), username, reportId };
      socket.emit('message', message);
      setMessageInput(''); // Clear input after sending
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #2196F3, #BBDEFB)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '400px',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: 2,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#f5f5f5',
          }}
        >
          {messages.map((msg, index) => (
            <Stack
              key={index}
              direction={msg.username === username ? 'row-reverse' : 'row'}
              spacing={1}
              sx={{ mb: 1, alignItems: 'flex-start' }}
            >
              <Box>
                <Username ownMessage={msg.username === username}>
                  {msg.username}
                </Username>
                <MessageBubble ownMessage={msg.username === username}>
                  <Typography variant="body2">{msg.text}</Typography>
                </MessageBubble>
                <Typography variant="caption" color="text.secondary">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            borderTop: '1px solid #ddd',
            padding: 1,
            bgcolor: '#fff',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            sx={{ borderRadius: 0, '& fieldset': { border: 'none' } }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 1 }}
            onClick={sendMessage}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat;
