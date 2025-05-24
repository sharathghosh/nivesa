#!/bin/bash

# Create directories if they don't exist
mkdir -p /Users/GHOSHSX75/Downloads/site/nivesa/public/images
mkdir -p /Users/GHOSHSX75/Downloads/site/nivesa/public/images/authors

echo "Starting image downloads..."

# Download images for the featured articles
# Parag Parikh Flexi Cap Fund
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/parag-parikh-fund.jpg "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# Mutual Funds
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/mutual-funds.jpg "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# NRI Investment
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/nri-investment.jpg "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# Credit Card Rewards
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/credit-card-rewards.jpg "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# Airline Miles
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/airline-miles.jpg "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# Debt Funds
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/debt-funds.jpg "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# Hotel Loyalty Programs
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/hotel-loyalty.jpg "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# SIP Investment
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/sip-investment.jpg "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# NRI Tax
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/nri-tax.jpg "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# Equity vs Hybrid Funds
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/equity-hybrid.jpg "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# Travel Credit Cards
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/travel-cards.jpg "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# ELSS Tax Saving
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/elss-tax-saving.jpg "https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# Beginners Guide
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/beginners-guide.jpg "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"

# Author images
curl -v -o /Users/GHOSHSX75/Downloads/site/nivesa/public/images/authors/aditya.jpg "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400"

echo "All images downloaded successfully!"
echo "Checking downloaded images:"
ls -la /Users/GHOSHSX75/Downloads/site/nivesa/public/images/
