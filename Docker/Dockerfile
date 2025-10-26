FROM python:3.14.0

WORKDIR Docker/app.py

COPY Docker/requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]