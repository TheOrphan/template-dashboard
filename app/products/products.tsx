'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button, Flex, LoadingOverlay, Paper, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { IProductsProps, IProduct } from './interfaces';
import classes from './products.module.css';
import renderColumn from './column';
import { productValidation } from './form/validation';
import { initialValues } from './form/initial-values';
import OpenModal from './form/modal';

const PAGE_SIZE = 10;

export default function Product({ rows, totalData }: IProductsProps) {
  const t = useTranslations();
  const router = useRouter();
  const [records, setRecords] = useState(rows?.slice(0, PAGE_SIZE));
  const [loadingState] = useState(false);
  const [page, setPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [openedPopover, setPopover] = useDisclosure(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const form = useForm<IProduct>({
    initialValues,
    validate: zodResolver(productValidation(t)),
  });

  const memoizedRenderColumn = useMemo(
    () =>
      renderColumn({
        t,
        setIsUpdate,
        form,
        open,
        openedPopover,
        setPopover,
        activePopover,
        setActivePopover,
        router,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activePopover]
  );

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(rows.slice(from, to));
  }, [page, rows]);

  return (
    <Paper>
      <LoadingOverlay
        visible={loadingState}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
      <Flex direction="row" justify="space-between" align="center">
        <Title order={1} mt="md" mb="lg">
          {t('product.title')}
        </Title>
        <Flex direction="row" gap="sm">
          <Button
            c="#593B15"
            radius="lg"
            style={{ background: '#FFCB05' }}
            leftSection={<IconPlus size={14} />}
            onClick={() => {
              setIsUpdate(false);
              form.reset();
              open();
            }}
          >
            {t('general.add')} {t('product.singular')}
          </Button>
        </Flex>
      </Flex>
      <DataTable
        withTableBorder
        borderRadius="sm"
        striped
        highlightOnHover
        records={records}
        totalRecords={totalData}
        recordsPerPage={PAGE_SIZE}
        classNames={{ root: classes.tableCustom, header: classes.headerCustom }}
        columns={memoizedRenderColumn}
        page={page}
        onPageChange={(p: number) => setPage(p)}
        idAccessor="_id"
      />
      <OpenModal form={form} opened={opened} close={close} isUpdate={isUpdate} />
    </Paper>
  );
}
