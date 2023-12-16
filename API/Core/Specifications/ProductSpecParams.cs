﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;
        private int _PageSize = 6;
        public int PageSize
        {
            get => _PageSize;
            set => _PageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public string? Sort { get; set; }
        public int? TypeID{ get; set; }
        public int? BrandID { get; set; }
        private string _search;
        public string? Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}
