#! /bin/bash

echo "Starting SSH server"
service ssh restart
echo "Starting debug server"
dotnet run -c Debug
