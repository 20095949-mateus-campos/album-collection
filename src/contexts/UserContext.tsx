import { createContext } from 'react';

export const UserContext = createContext({log: false, setLog: (log: boolean, flag: boolean) => { log = flag }});


