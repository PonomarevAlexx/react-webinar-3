export default function commentsTree(items) {
  const roots = [];
  const map = items?.reduce((acc, item) => {
    acc[item._id] = { ...item, children: [] };
    return acc;
  }, {});

  items?.forEach(item => {
    if (item.parent._type === 'comment') {
      const parent = map[item.parent._id];
      if (parent) {
        parent.children.push(map[item._id]);
      }
    } else {
      roots.push(map[item._id]);
    }
  });
  console.log(roots)
  return roots;
}
