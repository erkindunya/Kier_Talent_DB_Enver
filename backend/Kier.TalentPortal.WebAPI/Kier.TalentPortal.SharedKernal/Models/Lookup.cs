using System.Collections.Generic;

namespace Kier.TalentPortal.SharedKernal.Models
{
    public class Lookup
    {
        private IList<Lookup> _children = new List<Lookup>();
        public string label { get; set; }
        public string value { get; set; }

        public IList<Lookup> children
        {
            get { return _children; }
        }
    }
}