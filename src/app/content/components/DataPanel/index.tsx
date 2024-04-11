import { useState } from 'react'
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
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

import { useRemeshDomain, useRemeshQuery, useRemeshSend } from 'remesh-react'
import { DeleteIcon, FileDownIcon, Trash2Icon } from 'lucide-react'
import { AnimationPresence } from '../AnimationPresence'

import { DataPanelDomain } from './domain'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { Input } from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { cn } from '@/utils'
import TaskDomain, { type TaskData } from '@/domain/Task'
import noDataSvg from '@/assets/images/no-data.svg'
import { DEFAULT_LOGO } from '@/constants'

export const columns: Array<ColumnDef<TaskData>> = [
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
    size: 300,
    cell: ({ row }) => (
      <div className="h-12 w-16">
        <img className="block size-full rounded" src={row.getValue('logo') || DEFAULT_LOGO} />
      </div>
    )
  },
  {
    accessorKey: 'name',
    header: () => <div className="text-nowrap">店铺名称</div>,
    cell: ({ row }) => (
      <div className="min-w-28 text-xs text-slate-500">
        <div>{row.getValue('name')}</div>
      </div>
    )
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
    cell: ({ row }) => <div className="text-center text-xs text-slate-500">{row.getValue('rating')}</div>
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
    cell: ({ row }) => <div className="text-center text-xs text-slate-500">{row.getValue('commentCount')}</div>
  },
  {
    accessorKey: 'category',
    header: () => <div className="text-nowrap">分类</div>,
    cell: ({ row }) => <div className="min-w-40 text-xs text-slate-500">{row.getValue('category')}</div>
  },
  // {
  //   accessorKey: 'description',
  //   header: () => <div className="text-nowrap">简介</div>,
  //   cell: ({ row }) => <div className="text-slate-500">{row.getValue('description')}</div>
  // },
  {
    accessorKey: 'address',
    header: () => <div className="text-nowrap">地址</div>,
    cell: ({ row }) => <div className="min-w-40 text-xs text-slate-500">{row.getValue('address')}</div>
  },
  {
    accessorKey: 'fullAddress',
    header: () => <div className="text-nowrap">详细地址</div>,
    cell: ({ row }) => <div className="min-w-44 text-xs text-slate-500">{row.getValue('fullAddress')}</div>
  },
  // {
  //   accessorKey: 'openTime',
  //   header: () => <div className="text-nowrap">营业时间</div>,
  //   cell: ({ row }) => <div className="text-slate-500">{row.getValue('openTime')}</div>
  // },
  {
    accessorKey: 'website',
    header: () => <div className="text-nowrap">网址</div>,
    cell: ({ row }) => <div className="min-w-32 text-xs text-slate-500">{row.getValue('website')}</div>
  },
  {
    accessorKey: 'phone',
    header: () => <div className="text-nowrap">电话</div>,
    cell: ({ row }) => <div className="min-w-28 text-xs text-slate-500">{row.getValue('phone')}</div>
  },
  // {
  //   accessorKey: 'plusCode',
  //   header: () => <div className="text-nowrap">Plus Code</div>,
  //   cell: ({ row }) => <div className="text-slate-500">{row.getValue('plusCode')}</div>
  // },
  {
    accessorKey: 'coordinates',
    header: () => <div className="text-nowrap">坐标</div>,
    cell: ({ row }) => <div className="text-xs text-slate-500">{row.getValue('coordinates')}</div>
  },
  {
    accessorKey: 'googleId',
    header: () => <div className="text-nowrap">Google Id</div>,
    cell: ({ row }) => <div className="text-xs text-slate-500">{row.getValue('googleId')}</div>
  },
  {
    accessorKey: 'placeId',
    header: () => <div className="text-nowrap">Place Id</div>,
    cell: ({ row }) => <div className="text-xs text-slate-500">{row.getValue('placeId')}</div>
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

export const DataPanel = () => {
  const dataTableDomain = useRemeshDomain(DataPanelDomain())
  const dataTableState = useRemeshQuery(dataTableDomain.query.StateQuery())
  const taskDomain = useRemeshDomain(TaskDomain())
  const taskData = useRemeshQuery(taskDomain.query.DataQuery())
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const Send = useRemeshSend()

  const tsetData = [
    {
      placeId: 'ChIJ99Shke_nw4kR3O7W9N_LTE0',
      plusCode: '',
      coordinates: '40.3521381,-74.6521886',
      googleId: '0x89c3e7ef91a1d4f7:0x4d4ccbdff4d6eedc',
      logo: 'https://lh5.googleusercontent.com/p/AF1QipPCBdavWakXgrEpn-Jei1ZbZOeT8qX4_HXdfBIf=w122-h92-k-no',
      name: '锦里 SC house',
      rating: 4.1,
      commentCount: 175,
      openTime: '',
      description: '',
      website: 'https://www.njschouse.com/',
      address: '238 Nassau St, Princeton, NJ 08542',
      fullAddress: 'New Jersey, Princeton, Nassau St, 锦里 SC house邮政编码: 08542',
      phone: '(609) 454-3790',
      category: '中餐馆'
    },
    {
      placeId: 'ChIJV85Oz75YwokREEwM6yxMNtk',
      plusCode: '',
      coordinates: '40.775431999999995,-73.956852',
      googleId: '0x89c258becf4ece57:0xd9364c2ceb0c4c10',
      logo: 'https://lh5.googleusercontent.com/p/AF1QipNaUyJaO8dfVBG61K61c-ksx5qDjTnQGdMZJoES=w122-h92-k-no',
      name: 'Pig Heaven 中餐厅',
      rating: 4.3,
      commentCount: 582,
      openTime: '',
      description: '',
      website: 'http://pigheavennyc.com/',
      address: '1420 3rd Ave, New York, NY 10028',
      fullAddress: 'Pig Heaven 中餐厅1420 3rd Ave, New York, NY 10028',
      phone: '(212) 744-4333',
      category: '中餐馆>烧烤店>中餐外卖>餐馆>台湾风味餐馆'
    },
    {
      placeId: 'ChIJje1_98TCQIYR6HAXx0HxHws',
      plusCode: '',
      coordinates: '29.705356,-95.5483971',
      googleId: '0x8640c2c4f77fed8d:0xb1ff141c71770e8',
      logo: 'https://lh5.googleusercontent.com/p/AF1QipNtXG222hBa4fMz7O2b2gY8yF4jSNv5LuivjleV=w122-h92-k-no',
      name: 'Central China',
      rating: 4,
      commentCount: 209,
      openTime: '',
      description: '',
      website: 'https://ziweihunan.com/',
      address: '9390 Bellaire Blvd, Houston, TX 77036',
      fullAddress: 'Central China, 9390 Bellaire Blvd, Houston, TX 77036',
      phone: '(713) 541-9612',
      category: '中餐馆>亚洲风味餐馆>湘菜馆>餐馆>川菜馆'
    }
  ]

  const table = useReactTable({
    data: taskData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 50
      }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  const handleClear = () => {
    Send(taskDomain.command.ClearDataCommand())
  }
  const handleExport = () => {
    Send(taskDomain.command.ExportCommand())
  }

  return (
    <AnimationPresence present={dataTableState.open}>
      <div
        className={cn(
          'bg-white z-infinity fixed mx-auto inset-x-1 top-24 rounded-xl w-[60vw] min-w-[1200px] h-[80vh] shadow shadow-slate-400 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
        )}
      >
        <div className="flex size-full flex-col overflow-hidden px-4">
          <div className="flex shrink-0 items-center gap-x-4 py-4">
            <Input
              placeholder="搜索店铺名称..."
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
            <div className="ml-auto flex gap-x-4">
              <Button variant="outline" onClick={handleClear}>
                清空 <Trash2Icon className="ml-2 size-4" />
              </Button>
              <Button variant="outline" onClick={handleExport}>
                导出 Excel <FileDownIcon className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <div className="relative flex-1 shrink-0 overflow-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="flex-1">
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
                    <TableCell>
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-4">
                        <img className="w-24" src={noDataSvg} alt="no data" />
                        <span className="text-slate-400">暂无数据，去启动任务抓取吧～</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex shrink-0 items-center justify-end space-x-2 py-4">
            <div className="flex-1 select-none text-sm text-muted-foreground">
              <span>共计 {table.getFilteredRowModel().rows.length} 行，</span>
              <span>已选中 {table.getFilteredSelectedRowModel().rows.length} 行</span>
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
      </div>
    </AnimationPresence>
  )
}

DataPanel.displayName = 'Table'
