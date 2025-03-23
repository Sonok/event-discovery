# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy only what's needed
COPY requirements.txt .
COPY EventbriteDemo.py .
COPY eventbrite_token.py .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run the app
CMD ["python", "EventbriteDemo.py"]