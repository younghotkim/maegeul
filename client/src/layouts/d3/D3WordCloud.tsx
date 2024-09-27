import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

// Word 타입 정의 (size 속성을 사용)
type Word = {
  text: string;
  size: number;
};

interface D3WordCloudProps {
  words: Word[];
}

const D3WordCloud: React.FC<D3WordCloudProps> = ({ words }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const layout = cloud<Word>()
      .size([800, 476.5]) // 크기 설정
      .words(words.map((d) => ({ text: d.text, size: d.size }))) // 이미 size를 사용하므로 변경 불필요
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 90 : 0))
      .fontSize((d) => d.size || 10)
      .on("end", draw);

    layout.start();

    function draw(words: cloud.Word[]) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1]) // SVG의 height를 layout 크기와 맞춤
        .append("g")
        .attr(
          "transform",
          `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
        );

      svg
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style(
          "fill",
          () => d3.schemeCategory10[Math.floor(Math.random() * 10)]
        )
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text((d) => d.text || ""); // d.text가 없으면 빈 문자열을 반환
    }
  }, [words]);

  return <svg ref={svgRef} style={{ height: "476.5px", width: "100%" }}></svg>;
};

export default D3WordCloud;
