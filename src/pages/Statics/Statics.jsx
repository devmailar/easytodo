import { getStorage } from '@Hooks/storage';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import styles from './Statics.module.scss';

const Statics = () => {
  const [backlog] = getStorage('backlog');
  const [todos] = getStorage('todos');
  const [inprogress] = getStorage('inprogress');
  const [inreview] = getStorage('inreview');
  const [done] = getStorage('done');

  const [data] = useState([
    { property: 'Backlog', value: backlog.length },
    { property: 'To Do', value: todos.length },
    { property: 'In Progress', value: inprogress.length },
    { property: 'In Review', value: inreview.length },
    { property: 'Done', value: done.length },
  ]);

  const histogramRef = useRef();
  const pieRef = useRef();

  const margin = { top: 20, right: -20, bottom: 30, left: 30 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    const svgPillar = d3
      .select(histogramRef.current)
      .append('svg')
      .attr('width', 'auto')
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.property))
      .padding(0.1);

    svgPillar
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, (d) => d.value)]);
    svgPillar.append('g').call(d3.axisLeft(y));

    svgPillar
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.property))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .style('fill', (d) => {
        if (d.property === 'Backlog') return '#9073ab';
        if (d.property === 'To Do') return '#7397ab';
        if (d.property === 'In Progress') return '#aba473';
        if (d.property === 'In Review') return '#ab7373';
        if (d.property === 'Done') return '#8aab73';
      })
      .style('opacity', 1);

    svgPillar
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.top + 20)
      .style('display', 'none')
      .attr('text-anchor', 'middle');

    svgPillar
      .append('text')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 10)
      .style('display', 'none')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)');

    svgPillar
      .selectAll('text.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => x(d.property) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.value) - 5)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .text(
        (d) =>
          `${(
            (d.value / data.reduce((sum, d) => sum + d.value, 0)) *
            100
          ).toFixed(1)}%`
      );

    svgPillar
      .selectAll('text.property')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'property')
      .attr('x', (d) => x(d.property) + x.bandwidth() / 2)
      .attr('y', height + margin.top + 10)
      .attr('text-anchor', 'middle')
      .style('display', 'none')
      .text((d) => d.property);
  }, [backlog, todos, inprogress, inreview, done]);

  return (
    <div className={styles.statics}>
      <svg className={styles.histogram} ref={histogramRef}></svg>
    </div>
  );
};

export default Statics;
