#For node.js server
FROM node:22-slim

#Set Working Directory
WORKDIR /INDY-3-kubernetes-cluster-monitoring-SP

#Copy package.json and package-lock.json
COPY package.json ./

#Gather dependencies
RUN npm install

#Update package list and install Python
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    rm -rf /var/lib/apt/lists/*

#Create Python virtual Environment
RUN python3 -m venv /venv

#Activate venv by updating PATH
ENV PATH="/venv/bin:$PATH"

#Install python dependencies using pip
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

#Get that application code
COPY . .

#Expose the Node server port
EXPOSE 5000

#Run that Node.js server
CMD ["node", "server.js"]