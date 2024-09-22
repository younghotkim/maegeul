import { useState, useEffect, useCallback } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { DashboardContent } from "../../../layouts/dashboard";
import { Iconify } from "../../../dashboardComponents/iconify";
import { Scrollbar } from "../../../dashboardComponents/scrollbar";

import { TableNoData } from "../table-no-data";
import { UserTableRow } from "../user-table-row";
import { UserTableHead } from "../user-table-head";
import { TableEmptyRows } from "../table-empty-rows";
import { UserTableToolbar } from "../user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";
import { useUser } from "../../../context/UserContext"; // UserContext 임포트
import { Color } from "antd/es/color-picker";

interface Diary {
  diary_id: number;
  user_id: number;
  title: string;
  content: string;
  date: string;
  color: string;
}

export function UserView() {
  const table = useTable();
  const [diaryData, setDiaryData] = useState<Diary[]>([]); // Diary 데이터를 저장하는 상태
  const [filterName, setFilterName] = useState("");
  const { user } = useUser();

  // Diary 데이터를 API에서 가져오는 함수
  const fetchDiaryData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/diary/${user?.user_id}`
      ); // 적절한 API 엔드포인트로 수정
      const data: Diary[] = await response.json();
      setDiaryData(data); // 상태에 저장
    } catch (error) {
      console.error(
        "다이어리 데이터를 가져오는 중 오류가 발생했습니다:",
        error
      );
    }
  };

  useEffect(() => {
    fetchDiaryData(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  // 테이블에서 사용할 데이터 필터링
  const dataFiltered = applyFilter({
    inputData: diaryData,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          마음 일기
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          일기 쓰기
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={diaryData.length}
                numSelected={table.selected.length}
                onSort={(id) => table.onSort(id as keyof Diary)} // string을 keyof Diary로 캐스팅
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    diaryData.map((diary) => String(diary.diary_id))
                  )
                }
                headLabel={[
                  { id: "title", label: "제목" },
                  { id: "content", label: "내용" },
                  { id: "color", label: "무드 컬러" },
                  { id: "date", label: "작성 시간" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.diary_id}
                      row={row}
                      selected={table.selected.includes(String(row.diary_id))}
                      onSelectRow={() =>
                        table.onSelectRow(String(row.diary_id))
                      }
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    diaryData.length
                  )}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={diaryData.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

interface Diary {
  diary_id: number;
  user_id: number;
  title: string;
  content: string;
  date: string; // 날짜는 string으로 저장됨
  color: string;
}

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<keyof Diary>("title"); // orderBy는 Diary 속성 중 하나
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const onSort = useCallback(
    (id: keyof Diary) => {
      // id는 Diary 속성 중 하나여야 함
      const isAsc = orderBy === id && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback(
    (checked: boolean, newSelecteds: string[]) => {
      if (checked) {
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    },
    []
  );

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
