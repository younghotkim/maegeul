import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";

import { Iconify } from "../../dashboardComponents/iconify";
import { formatStr } from "../../utils/format-time";

// Diary 타입 정의
interface Diary {
  diary_id: number;
  user_id: number;
  title: string;
  content: string;
  formatted_date: string;
  color: string;
}

type UserTableRowProps = {
  row: Diary; // Diary 타입으로 변경
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({
  row,
  selected,
  onSelectRow,
}: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const colorMap: { [key: string]: string } = {
    빨간색: "#EE5D50",
    노란색: "#FFDE57",
    파란색: "#6AD2FF",
    초록색: "#35D28A",
  };

  // diaryData.color 텍스트를 컬러 코드로 변환
  const backgroundColor = colorMap[row.color] || "#FFFFFF"; // row.color가 전달되도록 수정

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        {/* Diary의 title 필드를 테이블에 표시 */}
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>

        {/* Diary의 content 필드를 테이블에 표시 */}
        <TableCell>{row.content}</TableCell>

        {/* Diary의 date 필드를 테이블에 표시 */}
        {/* color 필드를 배경색으로 표시 */}
        <TableCell>
          <span
            style={{
              display: "inline-block",
              width: "30px",
              height: "30px",
              backgroundColor: backgroundColor, // 매핑된 색상 코드 적용
              borderRadius: "50%", // 원형으로 표시 (원형 말고 사각형으로 하려면 이 부분을 제거)
            }}
          />
        </TableCell>

        {/* Diary의 date 필드를 테이블에 표시 */}
        <TableCell>{row.formatted_date}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: "action.selected" },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: "error.main" }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
