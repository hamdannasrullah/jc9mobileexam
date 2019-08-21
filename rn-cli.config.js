const Metro = require('metro');

Metro.Logger.on('log', logEntry => {
    if (
      logEntry.action_name === 'Transforming file' &&
      logEntry.action_phase === 'end'
    ) {
      console.log(logEntry.file_name, logEntry.duration_ms);
    }
  });