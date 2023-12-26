# Base-Image for python server
FROM python:3.10.9-slim

# Working Directory
WORKDIR /app

# Copy venv
# COPY venv /app/venv

# Copy requirements.txt file from local
COPY requirements.txt /app

# Activate the virtual environment
# RUN python -m venv venv
# RUN /app/venv/bin/activate

RUN pip install -r requirements.txt

# Activate virtual environment, Install all packages
# RUN /app/venv/bin/python -m pip install -r requirements.txt


# Copy rest of the files from local
COPY . /app

# Exposing the endpoint
EXPOSE 5000

# RUN App
CMD python app.py