import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  type TableCellProps,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { alpha, keyframes } from "@mui/material/styles";
import { entranceSx, reducedMotionQuery, scaleEntranceSx } from "../../theme/animations";

export type GenericTableColumn<T> = {
  id: string;
  label: string;
  align?: TableCellProps["align"];
  filterAccessor?: (row: T) => string | number | Date | null | undefined;
  filterPlaceholder?: string;
  filterable?: boolean;
  filterMatchMode?: "contains" | "startsWith";
  minWidth?: number;
  sortAccessor?: (row: T) => string | number | Date | null | undefined;
  sortable?: boolean;
  render: (row: T) => ReactNode;
};

type SortDirection = "asc" | "desc";

type SortConfig = {
  columnId: string;
  direction: SortDirection;
} | null;

type GenericTableProps<T> = {
  actionsHeader?: string;
  columns: GenericTableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  getRowKey: (row: T) => string | number;
  initialSortColumnId?: string;
  initialSortDirection?: SortDirection;
  initialRowsPerPage?: number;
  pagination?: boolean;
  renderActions?: (row: T) => ReactNode;
  rowsPerPageOptions?: number[];
  serialNumberHeader?: string;
  showSerialNumber?: boolean;
};

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

const fadeRowIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

function toFilterText(value: string | number | Date | null | undefined) {
  if (value === null || value === undefined) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function toComparableValue(value: string | number | Date | null | undefined) {
  if (value === null || value === undefined) {
    return null;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  return value;
}

export function GenericTable<T>({
  actionsHeader = "Actions",
  columns,
  data,
  emptyMessage = "No records found.",
  getRowKey,
  initialSortColumnId,
  initialSortDirection = "asc",
  initialRowsPerPage = 5,
  pagination = false,
  renderActions,
  rowsPerPageOptions = [5, 10, 25],
  serialNumberHeader = "Sr. No.",
  showSerialNumber = false,
}: GenericTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>(() =>
    initialSortColumnId
      ? {
          columnId: initialSortColumnId,
          direction: initialSortDirection,
        }
      : null,
  );

  useEffect(() => {
    setPage(0);
  }, [data]);

  const hasFilterRow = columns.some((column) => column.filterable);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((column) => {
        if (!column.filterable) {
          return true;
        }

        const filterValue = columnFilters[column.id]?.trim().toLowerCase();
        if (!filterValue) {
          return true;
        }

        const rawValue = column.filterAccessor?.(row);
        if (rawValue === null || rawValue === undefined) {
          return false;
        }

        const normalizedValue = toFilterText(rawValue).toLowerCase();

        if (column.filterMatchMode === "startsWith") {
          return normalizedValue.startsWith(filterValue);
        }

        return normalizedValue.includes(filterValue);
      }),
    );
  }, [columnFilters, columns, data]);

  const sortedData = useMemo(() => {
    if (!sortConfig) {
      return filteredData;
    }

    const column = columns.find((item) => item.id === sortConfig.columnId);
    const accessor = column?.sortAccessor ?? column?.filterAccessor;

    if (!column || !accessor) {
      return filteredData;
    }

    return [...filteredData].sort((leftRow, rightRow) => {
      const leftValue = toComparableValue(accessor(leftRow));
      const rightValue = toComparableValue(accessor(rightRow));

      if (leftValue === null && rightValue === null) {
        return 0;
      }

      if (leftValue === null) {
        return 1;
      }

      if (rightValue === null) {
        return -1;
      }

      let comparison = 0;

      if (typeof leftValue === "number" && typeof rightValue === "number") {
        comparison = leftValue - rightValue;
      } else {
        comparison = collator.compare(String(leftValue), String(rightValue));
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [columns, filteredData, sortConfig]);

  const visibleData = useMemo(() => {
    if (!pagination) {
      return sortedData;
    }

    const startIndex = page * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [page, pagination, rowsPerPage, sortedData]);

  const columnCount = columns.length + (renderActions ? 1 : 0) + (showSerialNumber ? 1 : 0);

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setColumnFilters((current) => ({
      ...current,
      [columnId]: value,
    }));
    setPage(0);
  };

  const handleSort = (column: GenericTableColumn<T>) => {
    if (!column.sortable) {
      return;
    }

    setSortConfig((current) => {
      if (current?.columnId === column.id) {
        return {
          columnId: column.id,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        columnId: column.id,
        direction: "asc",
      };
    });
    setPage(0);
  };

  return (
    <TableContainer
      component={Paper}
      sx={[
        {
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
          borderRadius: 2,
          boxShadow: "0 12px 30px rgba(13, 71, 161, 0.08)",
          overflowX: "auto",
        },
        entranceSx(80),
      ]}
    >
      <Table
        sx={{
          minWidth: 840,
          "& .MuiTableCell-root": {
            border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
          },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "#f7fbff",
              "& th": {
                color: "text.secondary",
                fontSize: "0.78rem",
                fontWeight: 800,
                textTransform: "uppercase",
              },
            }}
          >
            {showSerialNumber ? (
              <TableCell align="center" rowSpan={hasFilterRow ? 2 : 1} sx={{ minWidth: 90 }}>
                {serialNumberHeader}
              </TableCell>
            ) : null}
            {columns.map((column) => (
              <TableCell
                align={column.align ?? "center"}
                key={column.id}
                rowSpan={hasFilterRow && column.filterable ? 1 : hasFilterRow ? 2 : 1}
                sx={{
                  borderBottom: hasFilterRow && column.filterable ? "0 !important" : undefined,
                  pb: hasFilterRow && column.filterable ? 0.25 : undefined,
                  pt: hasFilterRow && column.filterable ? 0.5 : undefined,
                  minWidth: column.minWidth,
                }}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={sortConfig?.columnId === column.id}
                    hideSortIcon={false}
                    direction={sortConfig?.columnId === column.id ? sortConfig.direction : "asc"}
                    onClick={() => handleSort(column)}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      "& .MuiTableSortLabel-icon": {
                        opacity: 1,
                      },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
            {renderActions ? (
              <TableCell align="center" rowSpan={hasFilterRow ? 2 : 1} sx={{ minWidth: 120 }}>
                {actionsHeader}
              </TableCell>
            ) : null}
          </TableRow>
          {hasFilterRow ? (
            <TableRow
              sx={{
                bgcolor: "#f7fbff",
                "& th": {
                  borderTop: "none",
                  py: 1,
                },
              }}
            >
              {columns.map((column) => {
                if (!column.filterable) {
                  return null;
                }

                return (
                  <TableCell
                    align="center"
                    key={column.id}
                    sx={{
                      borderTop: "0 !important",
                      minWidth: column.minWidth,
                      pt: 0,
                      pb: 0.5,
                    }}
                  >
                    <TextField
                      fullWidth
                      onChange={(event) => handleFilterChange(column.id, event.target.value)}
                      placeholder={column.filterPlaceholder ?? `Filter ${column.label}`}
                      size="small"
                      value={columnFilters[column.id] ?? ""}
                      sx={{
                        "& .MuiInputBase-root": {
                          justifyContent: "center",
                          minHeight: 34,
                        },
                        "& .MuiInputBase-input": {
                          textAlign: "center",
                        },
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "background.paper",
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ) : null}
        </TableHead>

        <TableBody>
          {visibleData.length > 0 ? (
            visibleData.map((row, rowIndex) => (
              <TableRow
                hover
                key={getRowKey(row)}
                sx={[
                  {
                    animation: `${fadeRowIn} 320ms ease both`,
                    animationDelay: `${Math.min(rowIndex * 35, 280)}ms`,
                    transition: "background-color 160ms ease, box-shadow 160ms ease",
                    [reducedMotionQuery]: {
                      animation: "none",
                      transition: "none",
                    },
                    "& td": {
                      py: 1.75,
                    },
                    "&:hover": {
                      bgcolor: "rgba(227, 242, 253, 0.38)",
                      boxShadow: "inset 3px 0 0 rgba(21, 101, 192, 0.38)",
                    },
                  },
                ]}
              >
                {showSerialNumber ? (
                  <TableCell align="center" sx={{ color: "text.secondary", fontWeight: 700 }}>
                    {pagination ? page * rowsPerPage + rowIndex + 1 : rowIndex + 1}
                  </TableCell>
                ) : null}
                {columns.map((column) => (
                  <TableCell align={column.align ?? "center"} key={column.id}>
                    {column.render(row)}
                  </TableCell>
                ))}
                {renderActions ? (
                  <TableCell align="center">{renderActions(row)}</TableCell>
                ) : null}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnCount}>
                <Box sx={[{ py: 5, textAlign: "center" }, scaleEntranceSx(80)]}>
                  <Typography color="text.secondary">{emptyMessage}</Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {pagination ? (
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data.length}
                onPageChange={(_event, newPage) => setPage(newPage)}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                colSpan={columnCount}
                sx={{
                  "& .MuiTablePagination-toolbar": {
                    px: 2,
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        ) : null}
      </Table>
    </TableContainer>
  );
}
