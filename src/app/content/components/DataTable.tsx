import { useState, type FC } from 'react'
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { Input } from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'

export interface Shop {
  id: string
  /** Logo */
  logo: string
  /** 名称 */
  name: string
  /** 评分 */
  rating: string
  /** 评论数 */
  commentCount: string
  /** 分类 */
  category: string
  /** 简介 */
  description: string
  /** 地址 */
  address: string
  /** 详细地址 */
  fullAddress: string
  /** 营业时间 */
  openTime: string
  /** 网址 */
  website: string
  /** 电话 */
  phone: string
  /** plusCode */
  plusCode: string
  /** 坐标 */
  coordinates: string
  /** googleId */
  googleId: string
  /** placeId */
  placeId: string
}

export const columns: Array<ColumnDef<Shop>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'logo',
    header: 'Logo',
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('logo')}</div>
  },
  {
    accessorKey: 'name',
    header: () => <div className="text-nowrap">店铺名称</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          评分
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('rating')}</div>
  },
  {
    accessorKey: 'commentCount',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          评论数
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('commentCount')}</div>
  },
  {
    accessorKey: 'category',
    header: () => <div className="text-nowrap">分类</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('category')}</div>
  },
  {
    accessorKey: 'description',
    header: () => <div className="text-nowrap">简介</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('description')}</div>
  },
  {
    accessorKey: 'address',
    header: () => <div className="text-nowrap">地址</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('address')}</div>
  },
  {
    accessorKey: 'fullAddress',
    header: () => <div className="text-nowrap">详细地址</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('fullAddress')}</div>
  },
  {
    accessorKey: 'openTime',
    header: () => <div className="text-nowrap">营业时间</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('openTime')}</div>
  },
  {
    accessorKey: 'website',
    header: () => <div className="text-nowrap">网址</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('website')}</div>
  },
  {
    accessorKey: 'phone',
    header: () => <div className="text-nowrap">电话</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('phone')}</div>
  },
  {
    accessorKey: 'plusCode',
    header: () => <div className="text-nowrap">Plus Code</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('plusCode')}</div>
  },
  {
    accessorKey: 'coordinates',
    header: () => <div className="text-nowrap">坐标</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('coordinates')}</div>
  },
  {
    accessorKey: 'googleId',
    header: () => <div className="text-nowrap">Google Id</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('googleId')}</div>
  },
  {
    accessorKey: 'placeId',
    header: () => <div className="text-nowrap">Place Id</div>,
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('placeId')}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const shop = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            <DropdownMenuItem onClick={async () => await navigator.clipboard.writeText(shop.phone)}>
              复制 联系电话
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => await navigator.clipboard.writeText(shop.fullAddress)}>
              复制 详细地址
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => await navigator.clipboard.writeText(shop.googleId)}>
              复制 Google ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export interface DataTableProps {
  data?: Shop[]
}

export const DataTable: FC<DataTableProps> = ({ data = [] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className="flex size-full flex-col px-4">
      <div className="flex shrink-0 items-center py-4">
        <Input
          placeholder="搜索店铺名称..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              显示列 <ChevronDownIcon className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 shrink-0 overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <span className="text-slate-400">暂无数据～</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex shrink-0 items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            上一页
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            下一页
          </Button>
        </div>
      </div>
    </div>
  )
}

DataTable.displayName = 'Table'
