# INDY-3-kubernetes-cluster-monitoring-SP

Setup

Git clone: https://github.com/Dojeka/INDY-3-kubernetes-cluster-monitoring-SP

Command scripts and steps:

curl -fsSL https://ollama.com/install.sh | sh
sudo apt install python3-dev python3-venv build-essential 
sudo apt install nodejs   

Need a python virtual environment for LLM handeling(Run in project Directory):

python3 -m venv myenv
source myenv/bin/activate

Run in terminal to Deactivate PVE:

deactivate

To containerize using Docker(run in project terminal):

docker build -t multimodal-orchestration .

If you already have an LLM installed with OLLAMA:

docker run --network host multimodal-orchestration

If you want to share on a local network:

docker run -p 5000:5000 multimodal-orchestration
