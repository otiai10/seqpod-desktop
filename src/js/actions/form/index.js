export function addFastqFile(file) {
  return (dispath) => {
    dispath({type:'ADD_FASTQ_FILE', data: file});
  };
}

export function cancelFastqFile(file) {
  return (dispath) => {
    dispath({type: 'CANCEL_FASTQ_FILE', data:file});
  };
}
