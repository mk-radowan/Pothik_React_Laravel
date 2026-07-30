<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice-{{ $booking->id }}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: DejaVu Sans, Arial, sans-serif; color: #1f2937; background: #f8fafc; font-size: 13px; }
        .invoice-wrap { max-width: 760px; margin: 18px auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; }
        .invoice-head { padding: 18px 22px; background: linear-gradient(135deg, #0f172a, #1e293b); color: #f8fafc; border-radius: 10px 10px 0 0; }
        .invoice-body { padding: 18px 22px; }
        .muted { color: #6b7280; font-size: 12px; }
        .card-lite { border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; background: #f8fafc; }
        .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        .table th, .table td { border: 1px solid #e5e7eb; padding: 8px; font-size: 12px; }
        .table th { background: #f1f5f9; text-align: left; }
        .text-end { text-align: right; }
        .summary { border: 1px solid #fecdd3; background: #fff1f2; border-radius: 8px; padding: 10px; }
        .paid { color: #047857; font-weight: 700; }
        .chip { display: inline-block; padding: 4px 9px; border-radius: 999px; background: #dcfce7; color: #166534; font-size: 11px; border: 1px solid #bbf7d0; }
        .row { width: 100%; }
        .col-6 { width: 48%; display: inline-block; vertical-align: top; }
        .mb-2 { margin-bottom: 8px; }
        .mb-3 { margin-bottom: 12px; }
        .mb-4 { margin-bottom: 16px; }
        .fw-bold { font-weight: 700; }
    </style>
</head>
<body>
    @php
        $amountNumber = trim((string) preg_replace('/[^0-9,.]/', '', (string) $booking->total_amount));
        $amountTk = ($amountNumber !== '' ? $amountNumber : (string) $booking->total_amount) . ' tk';
    @endphp

    <div class="invoice-wrap">
        <div class="invoice-head">
            <div style="float:left">
                <div style="font-size:22px;font-weight:700">Pothik Car Rental</div>
                <div style="font-size:12px;opacity:0.9">Dhaka, Bangladesh</div>
            </div>
            <div style="float:right;text-align:right">
                <div style="font-size:12px;opacity:0.9">Invoice</div>
                <div style="font-size:18px;font-weight:700">#INV-{{ str_pad((string) $booking->id, 6, '0', STR_PAD_LEFT) }}</div>
            </div>
            <div style="clear:both"></div>
        </div>

        <div class="invoice-body">
            <div class="mb-3">
                <span class="chip">{{ strtoupper($booking->payment_status ?? 'unpaid') }}</span>
                <span class="muted" style="margin-left:8px">Issued {{ optional($booking->created_at)->format('d M Y, h:i A') }}</span>
            </div>

            <div class="row mb-4">
                <div class="col-6">
                    <div class="card-lite">
                        <div class="muted">Bill To</div>
                        <div class="fw-bold">{{ $booking->customer_name }}</div>
                        <div class="muted">Pickup: {{ $booking->pickup_location ?? 'N/A' }}</div>
                        <div class="muted">Dropoff: {{ $booking->dropoff_location ?? 'N/A' }}</div>
                    </div>
                </div>
                <div class="col-6" style="margin-left:3%">
                    <div class="card-lite">
                        <div class="muted">Booking Info</div>
                        <div><span class="muted">Car:</span> <span class="fw-bold">{{ $booking->car_name }}</span></div>
                        <div><span class="muted">Payment Method:</span> {{ strtoupper($booking->payment_method ?? 'N/A') }}</div>
                        <div><span class="muted">Reference:</span> {{ $booking->payment_reference ?? 'N/A' }}</div>
                    </div>
                </div>
            </div>

            <table class="table mb-4">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Pickup</th>
                        <th>Return</th>
                        <th class="text-end">Days</th>
                        <th class="text-end">Amount (BDT)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Car Rental Charge</td>
                        <td>{{ $booking->pickup_date }}</td>
                        <td>{{ $booking->return_date }}</td>
                        <td class="text-end">{{ $booking->rental_days }}</td>
                        <td class="text-end">{{ $amountTk }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="summary">
                <div class="mb-2"><strong>Subtotal:</strong> {{ $amountTk }}</div>
                <div class="mb-2"><strong>VAT:</strong> 0 tk</div>
                <div class="paid">Total Paid: {{ $amountTk }}</div>
            </div>

            <p class="muted" style="margin-top:12px">This is a computer generated invoice and valid without signature.</p>
        </div>
    </div>
</body>
</html>
