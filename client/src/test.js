import React from 'react';
import Tree from 'react-d3-tree';

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    return orientation === 'horizontal'
      ? `M${source.y},${source.x}L${target.y},${target.x}`
      : `M${source.x},${source.y}L${target.x},${target.y}`;
  };
const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

const subChart = [    {
    name: 'Manager',
    attributes: {
      department: 'Production',
    },
    children: [
      {
        name: 'Foreman',
        attributes: {
          department: 'Fabrication',
        },
        children: [
          {
            name: 'Worker',
          },
        ],
      },
      {
        name: 'Foreman',
        attributes: {
          department: 'Assembly',
        },
        children: [
          {
            name: 'Worker',
            attributes: {
                department: 'Assembly',
              },
              children:[
                {
                    name: 'Worker',
                    attributes: {
                        department: 'Assembly',
                      },
                      children:[
                        
                      ]
                  },
              ]
          },
        ],
      },
    ],
  }]

export default function OrgChartTree() {
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: '150em', height: '120em' }}>
      <Tree data={subChart} orientation="vertical" separation={{ siblings: 2, nonSiblings: 2 }}
        nodeSize={{ x: 200, y: 200 }}/>
    </div>
  );
}
