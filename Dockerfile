# Use PHP 8.3 
FROM php:8.3-fpm

# Set working directory inside container
WORKDIR /var/www

# Install system dependencies needed by Laravel and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    nodejs \
    npm \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

# Clear apt cache to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install required PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer (PHP dependency manager)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files to container
COPY . /var/www

# Install PHP dependencies
RUN composer install 

# Install Node.js dependencies and build assets
RUN npm install && npm run build

# Set proper permissions before running artisan commands
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM server
CMD ["php-fpm"]