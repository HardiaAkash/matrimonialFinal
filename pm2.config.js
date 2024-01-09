module.exports = {
    apps: [
      {
        name: 'client-dev',
        script: 'npm',
        args: 'run dev',
        cwd: './', // Assuming server.js is in the root directory
        instances: 1,
        autorestart: true,
        watch: true,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
      {
        name: 'client-prod',
        script: 'npm',
        args: 'start',
        cwd: './', // Assuming server.js is in the root directory
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  