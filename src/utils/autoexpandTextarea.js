const autoexpandTextarea = (e) => {
  const el = e.target;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
};

export default autoexpandTextarea;
