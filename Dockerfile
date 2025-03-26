# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy only what's needed
COPY requirements.txt .
COPY EventbriteDemo.py .
COPY eventbrite_token.py .
COPY firebase-key.json . 
COPY firebase_config.py .
COPY user.py .
COPY user_service.py .
COPY test_user.py .


# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt
