In the `/shared/` folder, you should put types, interfaces, and constants that should be shared between the client and the server code.

All the contents of that folder have to be processed before being avaiable at the front-end. In a separate terminal, run the `pnpm run watch-shared` command. It will react to any changes in that folder and copy the results into the client directory.